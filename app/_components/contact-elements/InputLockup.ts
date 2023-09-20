import styled from 'styled-components';

export const ContactFrom = styled.form`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;

  width: 100%;
  max-width: 60ch;

  > div {
    flex: 2 1 25ch;
    margin-left: auto;
  }

  > *:first-child {
    flex: 1 2 calc(25ch - 100%);
  }

  > article button {
    margin-left: auto;
  }

  > p,
  article {
    display: flex;
    flex: 0 0 100%;
  }
`;

export const InputLockup = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.25rem;

  label {
    flex: 0 0 14ch;
  }

  input {
    flex: 1 1 30ch;
    font-family: var(--base-font);
  }

  textarea {
    flex: 1 0 100%;
    font-family: var(--base-font);
  }
`;
