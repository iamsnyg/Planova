"use client"

import { createSprint } from '@/action/sprints';
import { sprintsSchema } from '@/app/libs/validator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { createId } from '@paralleldrive/cuid2';
import { addDays, format } from 'date-fns';
import {  Calendar1, X } from 'lucide-react';
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import { Controller, useForm } from 'react-hook-form';

const SprintsCreateForm = ({ projectId, projectTitle, projectKey, sprintKey }) => {
    const [showForm, setShowForm] = useState(false);

    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: addDays(new Date(), 14), // Default to 2 weeks from today
    })

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(sprintsSchema),
        defaultValues: {
            name: `${projectKey}-${createId( { length: 3 } )}-${sprintKey}`,
            startDate: dateRange.from,
            endDate: dateRange.to,
        }
    })

    const {loading: createSprintLoading, fn: createSprintFn} = useFetch(createSprint)
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold gradient-title mb-8">{projectTitle}</h1>
                <Button
                    variant={showForm ? "outline" : "planovaBtn"}
                    className="mt-4"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? <X /> : "Create Sprint"}
                </Button>
            </div>
            {showForm && 
                <Card>
                    <CardContent>
                        <form className='flex gap-4 items-end' >
                            <div className='flex-1'>
                                <label htmlFor="name" className="font-medium mb-2">Sprint Name:</label>
                                <Input 
                                    id="name" 
                                    readOnly
                                    {...register("name")} 
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>


                            <div className='flex-1'>
                                <label className="block font-medium text-sm mb-2">
                                    Sprint Duration:
                                </label>
                                <Controller control={control} name='dateRange'
                                    render={({ field }) => {
                                        return (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" 
                                                        className={`w-full justify-start text-left font-normal ${!dateRange && "text-muted-foreground"}`}
                                                    >
                                                        <Calendar1 className="h-4 w-4 mr-2" />
                                                        {dateRange.from && dateRange.to ? (
                                                            format(dateRange.from, 'MMM dd, yyyy') + ' - ' + format(dateRange.to, 'MMM dd, yyyy')
                                                        ) : (
                                                            <span>Please Pick a date range.</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent align='start' className="w-auto p-5 border-">
                                                    <DayPicker
                                                        mode="range"
                                                        selected={dateRange}
                                                        onSelect={(range) => {
                                                            if (range?.from && range?.to) {
                                                                setDateRange(range);
                                                                field.onChange(range)
                                                            }
                                                        }
                                                        }
                                                        classNames={{
                                                            chevron: "fill-emerald-500",
                                                            range_start: "bg-emerald-700 text-emerald-900 rounded-l-full",
                                                            range_end: "bg-emerald-700 text-emerald-900 rounded-r-full",
                                                            range_middle: "bg-emerald-200 text-black/70 ",
                                                            day_button: " focus:bg-emerald-100 ",
                                                            // day_today: "bg-emerald-100 text-emerald-900 rounded-full",
                                                            today: "border-2 border-emerald-500 ",
                                                            // focused: "bg-emerald-100 text-emerald-900",
                                                            
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )    
                                    }}
                                />
                            </div>

                            <Button>Create Sprint</Button>
                        </form>
                    </CardContent>
                </Card>
            }
        </>
    );
}

export default SprintsCreateForm