import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssuesDetailPage = () => {
    return (
        <Box className='max-w-xl p-5'>
            <Skeleton />
            <Flex className='space-x-3' my="2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className='prose' mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssuesDetailPage;