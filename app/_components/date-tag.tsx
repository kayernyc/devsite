import styled from 'styled-components';

const DateTag = styled.aside`
  align-items: center;
  display: flex;
  font-size: 0.8rem;

  strong {
    font-size: 0.6rem;
    margin-top: -0.07rem;
    padding: 0 0.5rem;
  }
`;

export const formatDate = (dateString: string) => {
  const PostDate = new Date(dateString);
  return (
    <DateTag>
      {PostDate.toLocaleString('default', { month: 'long' })}{' '}
      {PostDate.getDate()} <strong>|</strong> {PostDate.getFullYear()}
    </DateTag>
  );
};