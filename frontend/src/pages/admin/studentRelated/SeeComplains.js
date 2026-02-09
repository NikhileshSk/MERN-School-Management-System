import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import styled, { keyframes } from 'styled-components';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.error('Error fetching complaints:', error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows =
    Array.isArray(complainsList) &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString = !isNaN(date.getTime()) ? date.toISOString().substring(0, 10) : "Invalid Date";
      return {
        user: complain?.user?.name || "Unknown",
        complaint: complain.complaint || "No complaint provided",
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => (
    <StyledCheckbox
      sx={{
        color: 'rgba(255, 255, 255, 0.3)',
        '&.Mui-checked': { color: '#10b981' }
      }}
    />
  );

  return (
    <PageWrapper>
      {loading ? (
        <LoadingWrapper>
          <LoadingSpinner />
          <LoadingText>Loading complaints...</LoadingText>
        </LoadingWrapper>
      ) : response || !Array.isArray(complainsList) || complainsList.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyTitle>No Complaints</EmptyTitle>
          <EmptyText>There are no complaints at this time. All is well!</EmptyText>
        </EmptyState>
      ) : (
        <ContentWrapper>
          <PageHeader>
            <HeaderIcon>📝</HeaderIcon>
            <HeaderText>
              <PageTitle>Complaints Management</PageTitle>
              <PageSubtitle>{complainsList?.length || 0} complaints received</PageSubtitle>
            </HeaderText>
          </PageHeader>

          <TableWrapper>
            <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
          </TableWrapper>
        </ContentWrapper>
      )}
    </PageWrapper>
  );
};

export default SeeComplains;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const PageWrapper = styled.div`
  animation: ${fadeInUp} 0.5s ease forwards;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(239, 68, 68, 0.2);
  border-top-color: #ef4444;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
`;

const ContentWrapper = styled.div``;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const HeaderIcon = styled.span`
  font-size: 2.5rem;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(248, 113, 113, 0.15) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
`;

const HeaderText = styled.div``;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 4px;
`;

const PageSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
`;

const TableWrapper = styled.div`
  background: rgba(30, 30, 60, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 40px;
  background: rgba(30, 30, 60, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
`;

const EmptyIcon = styled.span`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  max-width: 400px;
`;

const StyledCheckbox = styled(Checkbox)``;
