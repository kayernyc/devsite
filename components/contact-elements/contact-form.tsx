'use client';

import axios from 'axios';
import { useState } from 'react';
import { validate } from '@/utilities/validations';
import InputComponent from './input-component';
import ContactTextArea from './contact-text-area';

import { ContactFrom } from './InputLockup';

interface IValues {
  name: string;
  email: string;
  message: string;
}
interface IErrors extends Partial<IValues> {}

export const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageState, setMessageState] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);

    axios
      .post('/api/sendEmail/', values)
      .then((res) => {
        if (res.status === 200) {
          setValues({ name: '', email: '', message: '' });
          setLoading(false);
          setSuccess(true);
          setMessageState(res.data.message);
        } else {
          setLoading(false);
          setMessageState(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessageState(String(err.message));
      });
    setLoading(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h3>Contact me:</h3>
      <ContactFrom onSubmit={handleSubmit}>
        <section>
          <InputComponent
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            label="Your Name"
            placeholder="John Doe"
            error={!!errors.name}
            errorMessage={!!errors.name ? errors.name : ''}
          />
          <InputComponent
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            label="Your Email"
            placeholder="you@example.com"
            error={!!errors.email}
            errorMessage={!!errors.email ? errors.email : ''}
          />
        </section>
        <ContactTextArea
          value={values.message}
          onChange={handleChange}
          id="message"
          name="message"
          label="Your Message"
          placeholder="Your message here..."
          error={!!errors.message}
          errorMessage={!!errors.message ? errors.message : ''}
        />
        <article>
          <button type="submit" disabled={loading}>
            {loading !== true ? 'Send' : <p>spinning!</p>}
          </button>
        </article>
        <p>{success !== false ? messageState : <span>{messageState}</span>}</p>
      </ContactFrom>
    </>
  );
};
