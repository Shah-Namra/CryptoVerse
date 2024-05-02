import React, {useState} from 'react'
import { Select, Typography, Raw, Col, Avatar, Card}  from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import {Row} from 'antd'; 

const{ Text, Title} = Typography;  
const {Option} = Select; 

const demoImage = 'https://www.bing.com/th?id=OVFT.7ZzZ9Z1J9ZzZ9Z1J9ZzZ9Z&pid=News';

const News = (simplified) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency'); 
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  // console.log(cryptoNews);

  if(!cryptoNews?.value) return 'Loading...';



  return (
    <Row gutter ={[24,24]}>
        {cryptoNews.value.map((news,i)=>
// display the news in form of cards
          <Col xs={24} sm={12} lg={8} key={i}>
            
            <Card hoverable className='news-card'>
                <a href={news.url}  target='_blank' rel='noreferrer'>
                  <div className='news-image-container'></div>
                  <Title className='news-title' level={4}>{news.name}</Title>
                  <img style = {{maxWidth: '200px', maxHeight:'100px'}}src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' ></img>
                </a>

                 <p>
{/* if the length of the description >100 then display only 100 characters */}
                 {news.description.length > 100 ? `${news.description.substring(0,100)}...` : news.description}
                 </p>

                 <div className='provider-container'>
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' /> 
                    <Text className=' provider-name' >{news.provider[0]?.name}</Text>
                  </div>

{/* time,date from moment */ }
                    <Text>{moment(news.datePublished).startOf('ss').fromNow}</Text> 

                 </div>
            </Card>
          </Col>
        )}
    </Row>
      
    
  )
}

export default News