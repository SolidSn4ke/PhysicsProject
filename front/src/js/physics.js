function getBulletSpeed(k, x, bulletWeight, cartWeight) {
    //m1v1^2/2 + m2v2^2/2= kx^2/2
    //m1v1 = m2v2 => v2 = m1/m2*v1
    //m1v1^2 + m2* m1^2/m2^2 * v1^2 = kx^2
    //v1^2 + m1/m2 * v1^2 = kx^2/(*m1)
    //v1^2(1 + m1/m2) = kx^2/(m1)
    //v1 = sqrt(kx^2/(m1*(1+m1/m2)))
    return Math.sqrt(k * Math.pow(x, 2) / (bulletWeight * (bulletWeight / cartWeight + 1)));
}

function getFirstCartSpeed(bulletWeight, bulletSpeed, cartWeight) {
    //0 = -m1V1 + m2V2 => V1 = m2/m1*V2
    return bulletWeight / cartWeight * bulletSpeed;
}

function getSecondCartSpeed(bulletWeight, bulletSpeed, cartWeight, height) {
    let V = Math.sqrt(Math.pow(getFirstCartSpeed(bulletWeight, bulletSpeed, cartWeight), 2) + 2 * 9.81 * height);
    //m1V^2/2 = (m1+m2)V2^2/2 -> V2 = sqrt(m1/(m1+m2))*V
    return Math.sqrt((bulletWeight) / (bulletWeight + cartWeight)) * V;
}

function getBulletDistance(bulletSpeed, height) {
    return bulletSpeed * Math.sqrt(2 * height / 9.81);
}

function getCartDistance(cartWeight, cartSpeed, frictionCoefficient) {
    // m*g*frictionCoefficient * h= mV^2/2 => h = mV^2/(2 m*g*frictionCoefficient) => h = v^2/(2g*frictionCoefficient)
    return Math.pow(cartSpeed, 2) / (2 * 9.81 * frictionCoefficient);
}

//Функция для расчета скорости тележки при упругом ударе (Можно переименовать)
function elasticCollisionVelocity() {

}

//Итоговый результат для первого случая (Дальность тележки)
export function carDistanceCase1(carWeight, ballWeight, k, x, friction) {
    return getCartDistance(carWeight, getFirstCartSpeed(ballWeight, getBulletSpeed(k, x, ballWeight, carWeight), carWeight), friction)
}

//Итоговый результат для второго случая (Дальность тележки, в которую врезались)
export function carDistanceCase2() {

}

//Итоговый результат для 3 случая (Дальность тележки с мячиком)
export function carDistanceCase3() {

}