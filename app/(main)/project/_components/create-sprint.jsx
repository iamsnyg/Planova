"use client"

import { sprintsSchema } from '@/app/libs/validator';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const SprintsCreateForm = ({ projectId, projectTitle, projectKey, sprintKey }) => {
    const [showForm, setShowForm] = useState(false);

    useState({
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 14)), // Default end date is 14 days from start date
    })

    useForm({
        resolver: zodResolver(sprintsSchema),
        defaultValues: {
            name: `${projectKey}-Sprint-${sprintKey}`,
        }
    })
    return (
        <>
            <div>
                <h1>{projectTitle}</h1>
                <Button
                    variant={showForm ? "outline" : "planovaBtn"}
                    className="mt-4"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancel" : "Create Sprint"}
                </Button>
            </div>
            {showForm && (<>
            hello
            </>)}
        </>
    );
}

export default SprintsCreateForm