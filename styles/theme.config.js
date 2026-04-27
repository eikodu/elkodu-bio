import styled from 'styled-components'

export default function ProfileSection({ avatar, mainName }) {
  return (
    <Container>
      <Card>
        {/* Profil Şəkli - İndi daha böyük və dairəvi */}
        <ProfileImage src={avatar} alt="Profile" />
        
        {/* Rəngli Glitch Yazı */}
        <ProfileName>{mainName}</ProfileName>
        
        {/* Altındakı lazımsız yazıları buradan sildik */}
        <WelcomeText>Welcome</WelcomeText>

        {/* Sosial Media İkonları və digər linklər bura gələcək */}
      </Card>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05); /* Şüşə effekti */
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px; /* Kartın eni */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 130px; 
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.bg.border};
  margin-bottom: 20px;
`;

const ProfileName = styled.h1`
  font-size: 32px;
  font-weight: 800;
  background: ${(props) => props.theme.accent.name};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glitch 1s linear infinite;
  margin: 0;
`;

const WelcomeText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-top: 10px;
`;
