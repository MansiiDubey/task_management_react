import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Comments = () => {
  const taskId = useParams().id;
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comment/filter?from=0&taskKey=${taskId}`);
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
        const response = await axiosInstance.post('/comment', {
          taskKey: taskId,
          comment: values.comment,
        });
        // Add the new comment to the state without refetching
        setComments(prevComments => [...prevComments, response.data]);
        resetForm();
        console.log("comment submitted", response.data);
      } catch (error) {
        console.error("Error submitting comment", error);
      }
    },
  });

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="comment"
          name="comment"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          placeholder="Write a comment..."
          required
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div>{formik.errors.comment}</div>
        ) : null}
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
  );
};
