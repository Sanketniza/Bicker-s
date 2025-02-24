
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Navbar from "../shared/Navbar"
  

const e = () => {
    return (
        <div>
            <Navbar />

            <h1 className="text-2xl font-semibold text-center mt-10">Invoices</h1>

               <Table>
                <TableCaption className="text-red-500">  <hr className='w-full h-1 my-2 bg-gray-300' /> A list of your recent posted jobs  </TableCaption>
               
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg text-amber-800 ">  Company Name  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-amber-800 ">  Role          <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-amber-800 ">  Date          <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-right text-amber-800 ">Action  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
                
                {/* <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job._id}>
                              
                                <TableCell>  {job?.company?.name}</TableCell>
                                <TableCell>  {job?.title}</TableCell>
                                <TableCell>  {job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 mt-2 cursor-pointer w-fit'> 
                                                <Eye/>
                                                <span>Applicants</span>
                                            </div>

                                            <div onClick={() => handleDelete(job._id)} className='flex items-center gap-2 mt-2 cursor-pointer w-fit'>
                                                <Delete/>
                                                <span>Delete</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody> */}
                
            </Table>

        </div>
    )
}   

export default e
