// "use client"

// import { updateSprintStatus } from '@/action/sprints';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import useFetch from '@/hooks/use-fetch';
// import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'
// import { get } from 'react-hook-form';
// import { BarLoader } from 'react-spinners';


// const SprintManager = ({ sprint, setSprint, sprints, projectId }) => {
//     const [status, setStatus] = useState(sprint.status);
//     const startDate = new Date(sprint.startDate);
//     const endDate = new Date(sprint.endDate);
//     const now = new Date();
//     const router = useRouter();

    
//     const canStart = isBefore(now, endDate) && isAfter(startDate, now) && status === "PLANNED";

//     const canEnd = status === "ACTIVE"

//     const {fn: updateStatusFn, loading, error, data: updatedStatus} = useFetch(updateSprintStatus)

//     console.log("updatedStatusFn", updateStatusFn);
//     const handleStatusChange = async (newStatus) => {
//          updateStatusFn( sprint.id, newStatus);
        
//     }
//     console.log("handleStatusChange", handleStatusChange)

//     useEffect(() => {
//         if (updatedStatus && updatedStatus.success) {
//             setStatus(updatedStatus.sprint.status);
//             setSprint({
//                 ...sprint,
//                 status: updatedStatus.sprint.status,
//             });
            
//         }
//     }, [updatedStatus, loading]);

//     const handleSprintChange = (value) => {
//         const selectedSprint = sprints.find((sprint) => sprint.id === value);
//         setSprint(selectedSprint);
//         setStatus(selectedSprint.status);
//         // router.push(`/project/${projectId}`, undefined, { shallow: true });
//     }

//     const getTextStatus = () => {
//         if(status === 'COMPLETED') {
//             return 'Sprint Completed';
//         }
//         if(status === 'ACTIVE' && isAfter(now, endDate)) {
//             return `Ongoing Sprint ${formatDistanceToNow(endDate)} left`;
//         }
//         if(status === "PLANNED" && isBefore(now, startDate)) {
//             return `Sprint starts in ${formatDistanceToNow(startDate)}`
//         }
//         if(status === "CANCELLED") {
//             return 'Sprint Cancelled';
//         }
//         return null;
//     }

//     return (
//         <>
//             <div className="flex justify-between items-center mb-4  bg-card">
//                 <Select className="" value={sprint.id} onValueChange={handleSprintChange}>
//                     <SelectTrigger className=" text-white w-full  self-start ">
//                         <SelectValue placeholder="Select sprint" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-card text-blue-500">
//                         {sprints.map((sprint) => (
//                             <SelectItem key={sprint.id} value={sprint.id}>
//                                 {sprint.name} ({format(new Date(sprint.startDate), 'dd MMM yyyy')} - {format(new Date(sprint.endDate), 'dd MMM yyyy')})
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>

//                 {canStart && (
//                     <Button className="bg-blue-500 text-white hover:bg-blue-600 ml-4" onClick={() => handleStatusChange("ACTIVE")} disabled={loading}>Start Sprint</Button>
//                 )}

//                 {canEnd && (
//                     <Button variant={"destructive"} className="ml-4" onClick={() => handleStatusChange("COMPLETED")} disabled={loading}>End Sprint</Button>
//                 )}
//             </div>

//             {loading && <BarLoader color="#4F46E5" width={"100%"} />}

//             {getTextStatus() && <Badge className=" ml-1 self-start">{getTextStatus()}</Badge>}
//         </>
//     );
// }

// export default SprintManager

















"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { BarLoader } from "react-spinners";
import { formatDistanceToNow, isAfter, isBefore, format } from "date-fns";

import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSprintStatus } from "@/action/sprints";

// import { updateSprintStatus } from "@/actions/sprints";

export default function SprintManager({
    sprint,
    setSprint,
    sprints,
    projectId,
}) {
    const [status, setStatus] = useState(sprint.status);
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        fn: updateStatus,
        loading,
        error,
        data: updatedStatus,
    } = useFetch(updateSprintStatus);

    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();

    const canStart =
        isBefore(now, endDate) &&
        isAfter(now, startDate) &&
        status === "PLANNED";

    const canEnd = status === "ACTIVE";

    const handleStatusChange = async (newStatus) => {
        updateStatus(sprint.id, newStatus);
    };

    useEffect(() => {
        if (updatedStatus && updatedStatus.success) {
            setStatus(updatedStatus.sprint.status);
            setSprint({
                ...sprint,
                status: updatedStatus.sprint.status,
            });
        }
    }, [updatedStatus, loading]);

    const getStatusText = () => {
        if (status === "COMPLETED") {
            return `Sprint Ended`;
        }
        if (status === "ACTIVE" && isAfter(now, endDate)) {
            return `Overdue by ${formatDistanceToNow(endDate)}`;
        }
        if (status === "PLANNED" && isBefore(now, startDate)) {
            return `Starts in ${formatDistanceToNow(startDate)}`;
        }
        return null;
    };

    useEffect(() => {
        const sprintId = searchParams.get("sprint");
        if (sprintId && sprintId !== sprint.id) {
            const selectedSprint = sprints.find((s) => s.id === sprintId);
            if (selectedSprint) {
                setSprint(selectedSprint);
                setStatus(selectedSprint.status);
            }
        }
    }, [searchParams, sprints]);

    const handleSprintChange = (value) => {
        const selectedSprint = sprints.find((s) => s.id === value);
        setSprint(selectedSprint);
        setStatus(selectedSprint.status);
        router.replace(`/project/${projectId}`, undefined, { shallow: true });
    };

    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <Select value={sprint.id} onValueChange={handleSprintChange}>
                    <SelectTrigger className="bg-slate-950 w-full self-start">
                        <SelectValue placeholder="Select Sprint" />
                    </SelectTrigger>
                    <SelectContent>
                        {sprints.map((sprint) => (
                            <SelectItem key={sprint.id} value={sprint.id}>
                                {sprint.name} (
                                {format(sprint.startDate, "MMM d, yyyy")} to{" "}
                                {format(sprint.endDate, "MMM d, yyyy")})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {canStart && (
                    <Button
                        onClick={() => handleStatusChange("ACTIVE")}
                        disabled={loading}
                        className="bg-green-900 text-white"
                    >
                        Start Sprint
                    </Button>
                )}
                {canEnd && (
                    <Button
                        onClick={() => handleStatusChange("COMPLETED")}
                        disabled={loading}
                        variant="destructive"
                    >
                        End Sprint
                    </Button>
                )}
            </div>
            {loading && (
                <BarLoader width={"100%"} className="mt-2" color="#36d7b7" />
            )}
            {getStatusText() && (
                <Badge variant="" className="mt-3 ml-1 self-start">
                    {getStatusText()}
                </Badge>
            )}
        </>
    );
}