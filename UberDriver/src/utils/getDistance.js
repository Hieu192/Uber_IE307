function haversineDistance(lat1, lng1, lat2, lng2) {
   console.log("tọa độ các điểm", lat1, lng1, lat2, lng2  )
    const toRad = (value) => (value * Math.PI) / 180; // Hàm chuyển đổi độ sang radian
  
    const R = 6371; // Bán kính trái đất (km)
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Khoảng cách theo km
    return distance.toFixed(2);
  }
  export default haversineDistance
  // Sử dụng

  

  