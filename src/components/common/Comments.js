import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/css/comment.css';
import { getUsername } from '../PrivateRoute';

export const Comments = ({ process }) => {
  const taskId = useParams().id;
  const [comments, setComments] = useState([]);


  const username = getUsername()
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/comments/filter?from=10&taskKey=${taskId}`);
      setComments(response.data);
      console.log("fetching comments", response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .required('Comment is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("comment value", {
          processInstanceKey: process,
          taskKey: taskId,
          ...values
        });
        const response = await axiosInstance.post('/api/comments', {
          processInstanceKey: process,
          taskKey: taskId,
          ...values
        });
        // Log the response to debug
        console.log("API Response:", response.data);

        if (response.data === "Comment inserted successfully") {
          // Option 1: Re-fetch comments from server
          // fetchComments();
           
          // Option 2: Add a dummy comment for immediate UI feedback
          const newComment = {
            id: Date.now(),  // or another method to generate unique ID
            comment: values.comment,
            commentBy: username,  // Replace with the actual username
            comment_date_time: new Date().toISOString()
          };
          setComments(prevComments => [...prevComments, newComment]);
          
          resetForm();
        } else {
          console.warn("Unexpected response from comment submission.");
        }
      } catch (error) {
        console.error("Error submitting comment", error);
      }
    },
  });

  useEffect(() => {
    fetchComments();
  }, []);

  // Helper function to format date without using a library
  // const formatDateTime = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { month: 'short' }; // Abbreviated month
  //   const month = date.toLocaleString('en-US', options);
  //   const day = date.getDate();
  //   const year = date.getFullYear();
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
  //   const ampm = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12 || 12; // Convert to 12-hour format
  //   return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
  // };
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <div className="comments-container">
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-text">{comment.comment}</div>
            <div className="comment-meta">
              <span className="comment-author">{comment.commentBy}</span>
              <span className="comment-date">{formatDateTime(comment.comment_date_time)}</span>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={formik.handleSubmit} className="comment-input">
        <input
          id="comment"
          name="comment"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          placeholder="Write a comment..."
          required
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div className="error-message">{formik.errors.comment}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
