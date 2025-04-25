import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AppError } from '../utils/AppError';
const prisma = new PrismaClient();

export const createProject= async (req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try {
        const {clientId,title,budget,deadline,status}=req.body;
        const client=await prisma.client.findFirst({
            where:{
                id:clientId
            }
        });
        if(!client) throw new AppError("Client is not found",404);
        
        const project= await prisma.project.create({
            data:{
                clientId,
                title,
                budget,
                deadline: new Date(deadline),
                status
            }
        });
        res.status(200).json({success:true,message:"Project created Successfully",project:project})
    } catch (error) {
        next(error);
    }

}

export const updateProject= async (req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try {
        
        const {projectId}=req.params;
        const {title,budget,clientId,deadline,status}=req.body;
        const userId = (req as any).user.userId;
        
        const updateData: any={};
        //for specific data update
        if (title) updateData.title = title;
        if(budget) updateData.budget= budget;
        if(clientId) updateData.clientId=clientId;
        if(deadline) updateData.deadline=new Date(deadline);
        if(status) updateData.status=status;

        const project= await prisma.project.findUnique({
            where:{id:projectId},
            include:{client:true}
        })
        if(!project) return next(new AppError('Project not found', 404));
        
        //checking that the client who owns the project is the user client or not
        if(project.client.userId !== userId){
            return next(new AppError('Unauthorized to update this project', 403));
        }
        //validate clientId if it's being changed
        if(clientId && clientId !== project.clientId){
            const client= await prisma.client.findUnique({ where: { id: clientId } });

            if (!client || client.userId !== userId) {
                return next(new AppError('Invalid clientId', 400));
              }
        }

        const updatedProject= await prisma.project.update({
            where:{id:projectId},
            data:updateData
        });

        res.status(200).json({success:true,message:"Project Data Update Succesfully",project:updatedProject})


    } catch (error) {
        next(error);
    }
}


export const deleteProject= async (req:Request,res:Response):Promise<any> =>{
    try {
        
    } catch (error) {
        
    }
}