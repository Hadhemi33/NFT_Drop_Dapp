import React, { useEffect, useState } from 'react'
import {useAddress , useContract, useDisconnect , useMetamask,useNFTDrop} from "@thirdweb-dev/react"
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '@/sanitynft/sanity.cli';
import { Collection } from '@/typing';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast ,{ Toaster } from 'react-hot-toast';
interface Props{
  collection: Collection
}
function NFTDropPage({collection}:Props){
  const [claimedSupply , setClaimedSupply]=useState<number>(0)
  const [totalSupply,setTotalSupply]=useState<BigNumber>(0)
    {/*Auth */} 
    {/*Connect to metaMask : by getting an instance  */} 
    const connectWithMetaMask = useMetamask();
    const address = useAddress();
    const disconnect =useDisconnect();
    const [loading , setLoading]=useState<boolean>(true);
    const [priceInEth , setPriceInEth]=useState<string>();
    
    const nftDrop=useContract(collection.address, "nft-drop").contract;



    console.log(address)
    useEffect(()=>{
      const fetchPrice=async()=>{
const claimConditions=await nftDrop?.claimConditions.getAll();
setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
      }
      fetchPrice();
    },[nftDrop])
    useEffect(()=>{
      if (!nftDrop) return ;


       const fetchNFTDropData=async()=>{
        setLoading(true);


        const claimed =await nftDrop.getAllClaimed();
        const total = await nftDrop.totalSupply();

        setClaimedSupply(claimed.length);
        setTotalSupply(total);

        setLoading(false);

      }
      fetchNFTDropData();


    },[nftDrop])
const minNFT =()=>{
  if (!nftDrop || !address) return ; 
  const quantity =1 ; 
  setLoading(true)
const notification= toast.loading('Minting.....',{
  style:{
    background:'white',
    color:'green',
    fontWeight:'bolder',
    fontSize:'17px',
    padding:'20px',
  }
})


  nftDrop.claimTo(address,quantity).then(async(tx)=>{
    const receipt = tx[0].receipt // the transaction receipt
    const claimedTokenId=tx[0].id// the id of the NFT claimed
    const claimedNFT=await tx[0].data() // (optional) get the claimed nft metdata
   toast('HOORAY! .. You Successfully Minted',{
    duration:8000,
    style:{
      background:'green',
    color:'white',
    fontWeight:'bolder',
    fontSize:'17px',
    padding:'20px',
    }
   })
    console.log(receipt)
    console.log(claimedTokenId)
    console.log(claimedNFT)

  }).catch(err=>{
    console.log(err)
    toast(' Whoops....Something went wrong',{
      duration:8000,
      style:{
        background:'red',
      color:'white',
      fontWeight:'bolder',
      fontSize:'17px',
      padding:'20px',
      }
     })
  })
  .finally(()=>{
    setLoading(false)
    toast.dismiss(notification)

  })
}

  return (
    <div className="flex  flex-col h-screen lg:grid lg:grid-cols-10" >
      <Toaster position='bottom-center'/>
    {/*Left */}  
        <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
    <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>

           <div className=' rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2'>
            
           <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
             src={urlFor(collection.previewImage).url()} alt="" />
           </div>

             <div className='space-y-2 p-5 text-center '>
                <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
                <h2 className='text-xl text-gray-300'>{collection.description}</h2>
             </div>



            
        </div>
    </div>
    {/*Right */} 
     
    <div className='flex flex-1 flex-col p-12 lg:col-span-6 bg-white'>
    {/*Header */} 
    <header className='flex  items-center justify-between '>
      <Link href={'/'}>
        <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>The  {''}
        <span className='font-extrabold underline
         decoration-pink-600/50'>PAPAFAM</span>
          {' '}NFT Market Place</h1>
          </Link>
        <button onClick={()=>{address ? disconnect(): connectWithMetaMask()}} className='rounded-full
         bg-rose-400 px-4 py-2 text-xs font-bold
          text-white lg:px:5 lg:py-3'>
            {address? 'Sign Out' : 'Connect Wallet'}
            </button>
           
    </header>
    <hr className='my-2 border ' />
    {address && (
      <p className='text-center text-sm text-rose-400'>You're logged in with wallet {address.substring(0,5)}...{address.substring(address.length-5)}</p>
    )}
    {/*Content */} 

    <div className='mt-10 flex flex-1 flex-col items-center space-y-6  text-center  lg:justify-center  lg:space-y-0 '>
        <img className='w-80 object-cover pb-10 lg:h-40' src={urlFor(collection.mainImage).url()} alt="" />
        <h1 className='text-3xl font-bold lg:text-5xl lg::font-extrabold'>{collection.title}</h1>

        {loading ? (
        <p className='pt-5 text-xl text-green-500  animate-pulse '>Loading Supply Count .... </p>

        ):(
          <p className='pt-5 text-xl text-green-500  '>{claimedSupply} / {totalSupply.toString()} NFT's claimed</p>

        )}
        {loading && (
          <img  className='h-80 w-80 object-contain' src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
        )}
    </div>
    {/*Mint Buttom */} 
    <button  onClick={minNFT}
    disabled={loading || claimedSupply === totalSupply?.toNumber()|| !address} className='h-16 w-full rounded-full 
     bg-red-600  text-white  mt-10  font-bold
      disabled:bg-gray-400 '>
        {loading? (
          <>Loading</>
        ): 
        claimedSupply===totalSupply?.toNumber() ? (
          <>Sold Out</>):!address?(
            <>Sign in to Mint</>):
            (
              <span className='font-bold'> Mint NFT({priceInEth} ETH)</span>
             

            )
          }
        
        </button>
    </div>
    </div>
  )
}

export default NFTDropPage
export const getServerSideProps:GetServerSideProps= async({params})=>{
  const query =`*[_type == "collection" && slug.current ==$id][0]{
    _id,
    title,
    description,
    address,
    nftCollectionName,
    mainImage{
      asset

    },
    previewImage{
      asset

    },
    slug{current},
    creator-> {
      _id,
      name,
      slug{current},
      address,
      slug{current},
    },
  

  }`
  const collection = await sanityClient.fetch(query,{id:params?.id})
  if (!collection){
    return {
      notFound:true
    }
  }
  return{
    props:{
      collection
    }
  }
}