import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    if (!issue)
        notFound();

    return (
        <div className='p-5'>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>Created: {issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='max-w-xl'>
                <p>{issue.description}</p>
            </Card>
        </div>
    )
}

export default IssueDetailPage