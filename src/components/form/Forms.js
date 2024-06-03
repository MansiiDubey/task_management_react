import { Form } from '@formio/react';
import React from 'react';
import MainJson from '../json/closure.json';

export const Forms = () => {
    const handleSubmit = (submission) => {
        console.log("Submitted Values:", submission.data);
    };

    return (
        <div>
            <h1>Forms</h1>
            <Form
                form={MainJson}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
