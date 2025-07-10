"use client";

import { createProject } from '@/action/projects'
import OrgSwitcher from '@/components/org-switcher';
import { Button } from '@/components/ui/button';
import { useOrganization, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/app/libs/validator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateProjectPage =  () => {
    const {isLoaded: isOrgLoaded, membership} = useOrganization();
    const {isLoaded: isUserLoaded} = useUser();
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(projectSchema),
    })

    useEffect(()=>{
        if (isOrgLoaded && isUserLoaded && membership) {
            setIsAdmin(membership.role === 'org:admin');
        }
    }, [isOrgLoaded, isUserLoaded, membership]);


    const {data: project, setData, loading, error, fn: createProjectFn} = useFetch(createProject);

    useEffect(() => {
        if(project){
            toast.success("Project created successfully!");
            setData(undefined);
            router.push(`/project/${project.id}`);
        }
    }, [loading]);
    
    if (!isOrgLoaded || !isUserLoaded) {
        return null; 
    }

    if (!isAdmin) {
        return <div className="container mx-auto py-20 text-center">
            <span className='text-3xl font-bold text-red-500'>You do not have permission to create a project.</span>
            <p className="my-4  text-lg">Please contact your organization admin for assistance.</p>
            <Button className='border-t border-gray-200  text-gray-500 hover:bg-gray-100' variant="outline" >
                <OrgSwitcher />
            </Button>
        </div>;
    }

    const onSubmit =async (data) => {
        createProjectFn(data)
    }

    return (
    <div className="container mx-auto  border-1 border-gray-200/30 bg-white/5 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold gradient-title text-center">Create a new project</h1>

        <div className='container w-[90%]  mx-auto mt-8 border border-gray-200/30 p-6 rounded-lg shadow-md bg-gray-900'>
            
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} >
                <div className='flex flex-col py-2 '>
                    <h3 className="text-lg font-semibold">Project Name:</h3>
                    <Input 
                        id="name"
                        placeholder="Project Name"
                        className="mt-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md w-full  py-2 "
                        {...register("name")}
                    />
                    {errors.name && (<p className="text-red-500 text-sm mt-2">{errors.name.message}</p>)}
                </div>


                <div className='flex flex-col py-2'>
                    <h3 className="text-lg font-semibold">Project Key:</h3>
                    <Input 
                        id="key"
                        placeholder="Project Key (e.g., myproject)"
                        className="mt-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 w-full"
                        {...register("key")}
                    />
                    {errors.key && (<p className="text-red-500 text-sm mt-2">{errors.key.message}</p>)}
                </div>


                <div className='flex flex-col py-2'>
                    <h3 className="text-lg font-semibold">Project Description:</h3>
                    <Textarea
                        id="description"
                        placeholder="Project Description (optional)"
                        className="mt-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md px-3 py-2 w-full"
                        {...register("description")}
                    />
                    {errors.description && (<p className="text-red-500 text-sm mt-2">{errors.description.message}</p>)}
                </div>

                <div className="flex justify-end">
                    <Button variant={"planovaBtn"} className="mt-4" type="submit" size={"lg"} disabled={loading}>
                        {loading ? "Creating..." : "Create Project"}
                    </Button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error.message}</p>
                    )}
                </div>
            </form>
            
        </div>
    </div>
)
}

export default CreateProjectPage