import{useState, useEffect} from 'react';

interface Location{
  latitude: number;
  longitude: number;
}

const FetchUserLocation = (): Promise<Location> => {
  return new Promise((resolve, reject)=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },(error)=>{
        reject(error);
      }
    );
    }else{
      reject(new Error('Geolocation not supported'));
    }
  });
};

export default FetchUserLocation;
