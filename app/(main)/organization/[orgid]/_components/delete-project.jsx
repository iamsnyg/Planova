"use client"

import { deleteProject } from '@/action/projects';
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch';
import { useOrganization } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const DeleteProject = ({projectId}) => {
  // deleteProject(projectId);
  const {membership} = useOrganization();
  const router = useRouter();
  // console.log("membership:=>", membership);
  const isAdmin = membership?.role === "org:admin";

  const {
    data: deleted,
    isLoading: isDeleting,
    error,
    fn: deleteProjectFn
  } = useFetch(deleteProject);
  
  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      deleteProjectFn(projectId);
    }
  }

  useEffect(() => {
    if (deleted?.success) {
      toast.error("Project deleted successfully");
      router.refresh();
    }
  }, [deleted]);

  if(!isAdmin) {
    return null; // or return a message indicating no permission
  }

  // console.log("isAdmin:=>", isAdmin);
    return (
        <div>
          <Button variant="ghost"  onClick={handleDelete} className={isDeleting ? "animate-pulse" : ""} size="sm" >
            <Trash2 className="h-4 w-4 mr-2" />
            {/* {isDeleting ? "Deleting..." : "Delete"} */}
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
        </div>

    )
}

export default DeleteProject