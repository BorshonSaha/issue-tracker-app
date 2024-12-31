import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React, { useState } from 'react'
import EditIssuePageClient from './page';

interface Props {
    params: { id: string }
}

const EditIssue = async ({ params }: Props) => {

    const existingIssue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    console.log(existingIssue);

    if (!existingIssue)
        notFound();

    return (
        <div><EditIssuePageClient issue={existingIssue} /></div>
    )
}

export default EditIssue