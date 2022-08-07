interface PersonalInformationStepProps {
  initialData: object;
  onBack: () => void;
}

const PersonalInformationStep = ({
  initialData,
  onBack,
}: PersonalInformationStepProps) => {
  return (
    <>
      <h2>Personal info</h2>
      <input type="text" placeholder="Type your first name" name="firstName" />
      <input type="text" placeholder="Type your last name" name="lastName" />
      <button onClick={() => onBack()}> Back </button>
      <button> Continue </button>
    </>
  );
};

export default PersonalInformationStep;
