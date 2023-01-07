import styled from 'styled-components';

type Props = { size?: number; color?: string };

const ErrorDiv = styled.div<Omit<Props, 'color'>>`
  top: 50%;
  left: 50%;
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  transform: translate3d(-50%, -50%, 0) scale(${(props) => props.size! / 80});
`;

export const Error = (props: Props) => {
  const { size = 60, color = 'rgba(0,0,0,0.3)' } = props;
  return (
    <ErrorDiv size={size}>
      <svg viewBox="0 0 1660 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
        <path
          d="M1041.37584541 216.84712859c5.26773642 3.87668931 9.9425679 8.52871646 13.8192572 13.81925639l431.90878354 586.3834465a65.1511821 65.1511821 0 0 1-52.44932428 103.8040535H804.69256825l51.69679074-218.28040494-81.68412138-233.55912222 175.5456078-238.34797284a65.1511821 65.1511821 0 0 1 91.10219568-13.81925639zM694.02449397 467.98817572l80.95439218 234.58530433-51.71959506 218.28040493H196.21199397l-1.52787139-0.04560782a65.1511821 65.1511821 0 0 1-50.44256792-103.73564218l228.7702708-310.91047284a65.1511821 65.1511821 0 0 1 104.96706069 0l93.90709424 127.63429075 122.13851358-165.83108148zM489.90540611 90.125a130.30236502 130.30236502 0 1 1 1e-8 260.62753354 130.30236502 130.30236502 0 0 1 0-260.62753354z"
          fill={color}
        ></path>
      </svg>
    </ErrorDiv>
  );
};
