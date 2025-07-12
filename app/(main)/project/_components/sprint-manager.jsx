"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns';
import React, { useState } from 'react'
import { get } from 'react-hook-form';


const SprintManager = ({ sprint, setSprint, sprints, projectId }) => {
    const [status, setStatus] = useState(sprint.status);
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const now = new Date();

    
    const canStart = isBefore(now, endDate) && isAfter(startDate, now) && status === "PLANNED";

    const canEnd = status === "ACTIVE"

    const handleSprintChange = (value) => {
        const selectedSprint = sprints.find((sprint) => sprint.id === value);
        setSprint(selectedSprint);
        setStatus(selectedSprint.status);
    }

    const getTextStatus = () => {
        if(status === 'COMPLETED') {
            return 'Sprint Completed';
        }
        if(status === 'ACTIVE' && startDate(now, endDate)) {
            return `Ongoing Sprint ${formatDistanceToNow(endDate)} left`;
        }
        if(status === "PLANNED" && isBefore(now, startDate)) {
            return `Sprint starts in ${formatDistanceToNow(startDate)}`
        }
        if(status === "CANCELLED") {
            return 'Sprint Cancelled';
        }
        return null;
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4  bg-card">
                <Select className="" value={sprint.id} onValueChange={handleSprintChange}>
                    <SelectTrigger className=" text-white w-full  self-start ">
                        <SelectValue placeholder="Select sprint" />
                    </SelectTrigger>
                    <SelectContent className="bg-card text-blue-500">
                        {sprints.map((sprint) => (
                            <SelectItem key={sprint.id} value={sprint.id}>
                                {sprint.name} ({format(new Date(sprint.startDate), 'dd MMM yyyy')} - {format(new Date(sprint.endDate), 'dd MMM yyyy')})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {canStart && (
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 ml-4">Start Sprint</Button>
                )}

                {canEnd && (
                    <Button variant={"destructive"} className="ml-4">End Sprint</Button>
                )}
            </div>

            {getTextStatus() && <Badge className=" ml-1 self-start">{getTextStatus()}</Badge>}
        </>
    );
}

export default SprintManager