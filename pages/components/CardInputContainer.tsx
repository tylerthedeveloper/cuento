import { Card } from '@nextui-org/react';

const CardInputContainer = ({ children, key, onPress }: any) => {
  return (
    <Card
      className="py-4 w-full max-w-64 m-4"
      key={key}
      isPressable
      onPress={onPress}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
      }}
    >
      {children}
    </Card>
  );
};

export default CardInputContainer;
