import { prisma } from "../config/prisma"
import AppError, { handleError } from "../responce/error"
import { SuccessResponse } from "../responce/functionRes"

const createCategory=async(name:string)=>{
  try {
      const finalName=name.toLocaleLowerCase().trim()
    const findIfExist=await prisma.category.findFirst({
      where:{
          name:finalName
      }
    })
    if(findIfExist) throw new AppError({
      message:"Already exist category with same name"
    })

    const createNow=await prisma.category.create({
      data:{
        name:name
      }
    })

    return SuccessResponse({
        message:"successfully create category",
        status:200,
        data:createNow
    })
  } catch (error) {
    throw handleError(error)
  }
}

const deleteCategory=async(id:string)=>{
  try {
      const categoryId=id.toLocaleLowerCase().trim()
    const findIfExist=await prisma.category.findUnique({
      where:{
        id:categoryId
      }
    })
    if(!findIfExist) throw new AppError({
      message:"Invalid category"
    })
    await prisma.category.delete({
      where:{id:categoryId}
    })
  } catch (error) {
    throw handleError(error)
  }
}


const editCategory=async()=>{
  try {
    console.log("hellow world")
  } catch (error) {
    console.log(error)
  }
}


export {
  createCategory,
  deleteCategory
}