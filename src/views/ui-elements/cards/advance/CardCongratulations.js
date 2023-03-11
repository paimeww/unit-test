import { Award } from 'react-feather'
import Avatar from 'src/@core/components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'

const CardCongratulations = () => {
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src="/images/elements/decore-left.png" alt='decor-left' />
        <img className='congratulations-img-right' src="/images/elements/decore-right.png" alt='decor-right' />
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Congratulations John,</h1>
          <CardText className='m-auto w-75'>
            You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
