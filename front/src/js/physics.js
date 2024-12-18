function getBulletSpeed(k, x, weight) {
    //mv^2/2 = kx^2/2 => v = sqrt(kx^2/m)
    return Math.sqrt(k*Math.pow(x, 2) / weight);
}
function getFirstCartSpeed(bulletWeight, bulletSpeed, cartWeight) {
    //0 = -m1V1 + m2V2 => V1 = m2/m1*V2
    return bulletWeight/cartWeight * bulletSpeed;
}
function getSecondCartSpeed(bulletWeight, bulletSpeed, cartWeight, height) {
    let V = Math.sqrt(Math.pow(getFirstCartSpeed(bulletWeight, bulletSpeed, cartWeight), 2) + 2 * 10 * height);
    //m1V^2/2 = (m1+m2)V2^2/2 -> V2 = sqrt(m1/(m1+m2))*V
    return Math.sqrt((bulletWeight)/(bulletWeight + cartWeight)) * V;
}
function getBulletDistance(bulletSpeed, height) {
    return bulletSpeed * Math.sqrt(2*height/10);
}
function  getCartDistance(cartWeight, cartSpeed, frictionCoefficient) {
    // m*g*frictionCoefficient * h= mV^2/2 => h = mV^2/(2 m*g*frictionCoefficient)
    return  Math.pow(cartSpeed, 2)/ (2 * 10 * frictionCoefficient);
}

export function carDistance(carWeight, ballWeight, k, x, friction){
    return getCartDistance(carWeight, getFirstCartSpeed(ballWeight, getBulletSpeed(k, x, ballWeight), carWeight), friction)
}