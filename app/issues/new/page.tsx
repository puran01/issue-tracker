"use client";
import React from 'react'
import { TextField, Text, TextArea, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useState} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { Spinner } from '@radix-ui/themes';

interface IssueForm{
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const {register, control, handleSubmit, formState:{ errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const onsubmit = handleSubmit(async(data)=> {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
           setError("Unexpected Error occured!")
        }
        
        })
  return (

    <div className='max-w-xl'>
        { error &&
        <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form className=' space-y-3 '
     onSubmit={onsubmit}>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        {errors.title && <Text color='red' as="p">{errors.title.message}</Text>}
        <Controller
        name ="description"
        control = {control}
        render={({ field })=> <SimpleMDE placeholder="Description" {...field}/> }
        />
        {errors.description && <Text color='red' as="p">{errors.description.message}</Text>}
        <Button disabled={submitting}>Submit New Issue { submitting && <Spinner/>}</Button>

    </form>
    </div>
  )
}

export default NewIssuePage;