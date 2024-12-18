const dist = 10;
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

function getBulletSpeedAtDist(startSpeed) {
    return Math.sqrt(Math.pow(startSpeed, 4) + Math.pow(9.81 * dist, 2)) / startSpeed;
}

function getBulletDistance(bulletSpeed, height) {
    return bulletSpeed * Math.sqrt(2 * height / 9.81);
}

function getCartDistance(cartWeight, cartSpeed, frictionCoefficient) {
    // m*g*frictionCoefficient * h= mV^2/2 => h = mV^2/(2 m*g*frictionCoefficient) => h = v^2/(2g*frictionCoefficient)
    return Math.pow(cartSpeed, 2) / (2 * 9.81 * frictionCoefficient);
}

//Функция для расчета скорости тележки при упругом ударе (Можно переименовать)
function getFirstCartSpeedBeforeCollision(frictionCoefficient, startSpeed) {
    return Math.pow(startSpeed, 2) + 2 * frictionCoefficient * 9.81 * dist;

}
function getFirstCartSpeedAfterCollision(frictionCoefficient, startSpeed, firstCartWeight, secondCartWeight) {
   return (firstCartWeight - secondCartWeight)/(firstCartWeight + secondCartWeight) *  getFirstCartSpeedBeforeCollision(frictionCoefficient, startSpeed);
}
function getSecondCartSpeedAfterCollision(frictionCoefficient, startSpeed, firstCartWeight, secondCartWeight) {
    return 2 * firstCartWeight/ (firstCartWeight + secondCartWeight) * getFirstCartSpeedBeforeCollision(frictionCoefficient, startSpeed);
}

//Итоговый результат для первого случая (Дальность тележки)
export function carDistanceCase1(carWeight, ballWeight, k, x, friction) {
    return getCartDistance(carWeight, getFirstCartSpeed(ballWeight, getBulletSpeed(k, x, ballWeight, carWeight), carWeight), friction)
}

//Итоговый результат для второго случая (Дальность тележки, в которую врезались) 1 тачка
export function getFirstCartsDistCase2(frictionCoefficient, k, x, ballWeight, firstCartWeight, secondCartWeight) {
    let startSpeed = getFirstCartSpeed(ballWeight, getBulletSpeed(k, x, ballWeight, firstCartWeight), firstCartWeight)
    return getCartDistance(firstCartWeight
        , getFirstCartSpeedAfterCollision(frictionCoefficient, startSpeed, firstCartWeight, secondCartWeight)
    , frictionCoefficient);
}
//Итоговый результат для второго случая (Дальность тележки, в которую врезались) 2 тачка
export function getSecondCartsDistCase2(frictionCoefficient, k, x, ballWeight, firstCartWeight, secondCartWeight) {
    let startSpeed = getFirstCartSpeed(ballWeight, getBulletSpeed(k, x, ballWeight, firstCartWeight))
    return getCartDistance(secondCartWeight
        , getSecondCartSpeedAfterCollision(frictionCoefficient, startSpeed, firstCartWeight, secondCartWeight)
        , frictionCoefficient);
}

//Итоговый результат для 3 случая (Дальность тележки с мячиком)
export function getSecondCartDistanceCase3(frictionCoefficient, k, x, ballWeight, firstCartWeight, secondCartWeight) {
    let startSpeed = getBulletSpeed(k, x, ballWeight, firstCartWeight);
    let endSpeed = getBulletSpeedAtDist(startSpeed);
    let cartSpeed = ballWeight/(ballWeight + secondCartWeight) * endSpeed
    return getCartDistance(secondCartWeight, cartSpeed, frictionCoefficient)
}