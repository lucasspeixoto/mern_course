import styled from "styled-components";

export const ListItem = styled.li`
  margin: 1rem 0;
`;

export const Card = styled.div`
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 0;
  overflow: hidden;
  background: white;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    height: 20rem;
  }
`;

export const InfoContainer = styled.div`
  padding: 1rem;
  text-align: center;

  h2,
  h3,
  p {
    margin: 0 0 0.5rem 0;
  }
`;

export const ActionsContainer = styled.div`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;

  button a {
    margin: 0.5rem;
  }
`;

export const ModalContent = styled.div`
  height: 15rem;
  width: 100%;
`;

export const DeleteModalContent = styled.div`
  height: 2rem;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 1rem 0 0 0;
  width: 100%;
`;
