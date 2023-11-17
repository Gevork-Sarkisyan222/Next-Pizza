import React from 'react';
import './mobileInfo.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import Taste from '../taste/Taste';

interface MobileInfoProps {
  openInfoMobile: boolean;
  handleClosePizzasInfoForMobile: () => void;
  title: string;
  price: number;
  image: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '820px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MobilePizzaInfo: React.FC<MobileInfoProps> = ({
  openInfoMobile,
  handleClosePizzasInfoForMobile,
  title,
  image,
  price,
}) => {
  const deliverNumber = Math.floor(Math.random() * 100);

  const handleBuyPizza = () => {
    const buyPizza = window.confirm('вы хотите купить этот товар?');

    if (buyPizza) {
      alert(`Мы передали ваш заказ под номером ${deliverNumber} курьерской службе`);
      window.location.reload();
    }
  };

  return (
    <div className="Mobile-Pizza-Info-Main">
      <Modal
        sx={{ width: '100%' }}
        open={openInfoMobile}
        onClose={handleClosePizzasInfoForMobile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <svg
            onClick={handleClosePizzasInfoForMobile}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.925 11.16a1.25 1.25 0 00-1.766-.085l-10.16 9.236-10.158-9.236a1.25 1.25 0 10-1.682 1.85l10.462 9.511.017.016c.079.072.184.167.285.246.12.093.31.223.568.301.332.101.686.101 1.018 0 .258-.078.447-.208.568-.301.1-.079.205-.174.284-.246l.018-.016 10.461-9.511a1.25 1.25 0 00.085-1.766z"
              fill="#000"></path>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={image} width={300} height={300} alt="pizza-image" />
          </div>
          <h1 style={{ fontSize: '26px', marginTop: '30px' }} className="pizza-info-mobile-title">
            Пицца {title}
          </h1>
          <div className="pizzas-with-taste">
            <h3>Добавить по вкусу</h3>
            <Taste />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}>
            <Button
              onClick={handleBuyPizza}
              sx={{
                backgroundColor: 'rgb(255, 105, 0)',
                marginTop: '-33px',
                width: '360px',
                height: '50px',
                borderRadius: '40px',
                cursor: 'pointer',
                position: 'absolute',

                '&:hover': {
                  backgroundColor: 'rgb(207, 86, 0)',
                },
              }}
              variant="contained">
              Купить {price}₽
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MobilePizzaInfo;
