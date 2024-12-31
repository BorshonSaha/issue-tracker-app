'use client';
import { Issue } from '@prisma/client';
import React from 'react';

interface Props {
    issue: Issue;
}

const EditIssuePageClient = ({ issue }: Props) => {

    return (
        <div className="max-w-xl">
            <p>{issue.id}</p>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
        </div>
    );
};

export default EditIssuePageClient;
