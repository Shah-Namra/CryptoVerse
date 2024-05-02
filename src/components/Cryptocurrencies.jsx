import React, { useState, useEffect } from 'react'
import millify from 'millify';
import  {Link}  from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoAPI';



const Cryptocurrencies = (simplified) => {
  const count = simplified ? 10 : 100;
  
  const {data: cryptosList, isFetching} = useGetCryptosQuery(10); 
  
// state to keep the filtered cyrptocurrencies
  const{cryptos, setCryptos} = useState(); 

  // search bar for the query
  const [search, setSearch] = useState(''); 
  
  console.log(cryptos);

// search bar and filter
// to filter the data based on the search input
  useEffect(() => {
      setCryptos(cryptosList?.data?.coins);
      const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
      setCryptos(filteredData);
  }, [cryptosList, search]);

  if(isFetching) return 'Loading...';

  return (
    <>
    
   {!simplified && (
      <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(e) =>{
          setSearch(e.target.value);
        }}/>
      </div> 
      // search bar only in cryptocurrencies page not in home page
   )}
    


      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
//Display the data in the form of cards          
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`} 
                extra={<img className='crypto-image' 
                src={currency.iconUrl} 
                alt='crypto'/>} 
                hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies