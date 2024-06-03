import React, { useEffect, useRef } from 'react';
import ReactBpmn from 'react-bpmn';
import '@/components/cssfile/diagram.css';
import { baseURL } from '@/views/apiCall';

const Diagram = ({ elementIds, processDefinitionKey }) => {
    const bpmnRef = useRef();

    const highlightElements = () => {
        const bpmnViewer = bpmnRef.current.bpmnViewer;
        const elementRegistry = bpmnViewer.get('elementRegistry');
        const canvas = bpmnViewer.get('canvas');

        // Normalize elementIds to be an array
        const elementsToHighlight = Array.isArray(elementIds) ? elementIds : [elementIds];

        // Remove previous highlights
        elementRegistry.getAll().forEach(element => {
            canvas.removeMarker(element.id, 'highlight');
        });

        // Highlight the current elements
        elementsToHighlight.forEach(id => {
            const element = elementRegistry.get(id);
            if (element) {
                canvas.addMarker(id, 'highlight');
                console.log("highlight", id);
            }
        });
    };

    useEffect(() => {
        highlightElements();
    }, [elementIds]); // Add elementIds to the dependency array

    const handleShown = () => {
        console.log('Diagram shown');
        highlightElements();
    };

    return (
        <div style={{ height: '60vh' }}>
            <ReactBpmn
                url={`${baseURL}/process-definitions?processDefinitionKey=${processDefinitionKey}`}
                onShown={handleShown}
                ref={bpmnRef}
                style={{ height: '100vh' }}
            />
        </div>
    );
};

export default Diagram;
