import styled from 'styled-components';

const DateTag = styled.aside`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  width: fit-content;

  strong {
    color: hsl(0, 0%, 73.33333333333333%);
    font-size: 0.6rem;
    margin-top: -0.07rem;
    padding: 0 0.5rem;
  }
`;

export const formatDate = (dateNumber: number) => {
  const PostDate = new Date(dateNumber);
  return (
    <DateTag>
      {PostDate.toLocaleString('default', { month: 'long' })}{' '}
      {PostDate.getDate()} <strong>|</strong> {PostDate.getFullYear()}
    </DateTag>
  );
};
