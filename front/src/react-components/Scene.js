// MatterStepOne.js
import React, {useEffect, useRef} from 'react';
import Matter from 'matter-js';

/** Функция для нахождения потенциальной энергии пружины
 * x - деформация пружины (см)
 * k - коэффициент жесткости пружины (0.2 <= k <= 1)
 * */
function elasticPotentialEnergy(x, k){
    return 0.5 * k / 500 * x ** 2
}

/** Функция для нахождения скорости тележки
 * x - деформация пружины (см)
 * k - коэффициент жесткости пружины (0.2 <= k <= 1)
 * m - масса шарика
 * */
function getVelocity(x, k, m){
    return Math.sqrt(2 * elasticPotentialEnergy(x, k) / m)
}

const Scene = (props) => {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);

    function newCar(xx, yy, width, height, wheelSize) {
        const Body = Matter.Body,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Constraint = Matter.Constraint;

        const group = Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = height * 0.5;

        const car = Composite.create({label: 'Car'}),
            body = Bodies.rectangle(xx, yy, width, height, {
                mass: props.carMass,
                collisionFilter: {
                    group: group
                },
                density: 0.02
            })

        const wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
            collisionFilter: {
                group: group
            },
            mass: props.carMass,
            friction: 0.8
        });

        const wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
            collisionFilter: {
                group: group
            },
            mass: props.carMass,
            friction: 0.8
        });

        const axelA = Constraint.create({
            bodyB: body,
            pointB: {x: wheelAOffset, y: wheelYOffset},
            bodyA: wheelA,
            stiffness: 1,
            length: 0
        });

        const axelB = Constraint.create({
            bodyB: body,
            pointB: {x: wheelBOffset, y: wheelYOffset},
            bodyA: wheelB,
            stiffness: 1,
            length: 0
        });

        Composite.addBody(car, body);
        Composite.addBody(car, wheelA);
        Composite.addBody(car, wheelB);
        Composite.addConstraint(car, axelA);
        Composite.addConstraint(car, axelB);

        return car;
    }

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Runner = Matter.Runner
        let Composite = Matter.Composite
        let Body = Matter.Body

        let engine = Engine.create({});

        let render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: 800,
                height: 600,
                showVelocity: true,
                background: 'rgba(255, 0, 0, 0.5)',
                wireframes: false,
            },
        });

        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                }
            }
        });

        let floor = Bodies.rectangle(400, 600, 800, 20, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            },
        })


        let car = null;
        let ball = null;

        /** Сцена для первого случая*/
        if (props.cases === 1){
            let scale = 1
            car = newCar(700, 540, 150 * scale, 50 * scale, 30 * scale);

            ball = Bodies.circle(700, 450, 10, {
                restitution: 0.9,
                mass: props.ballMass,
                render: {
                    fillStyle: 'yellow',
                },
            });

            World.add(engine.world, [floor, ball, mouseConstraint, car]);
        }

        /** Сцена для второго случая*/
        if (props.cases === 2){
            let scale = 1
            car = newCar(700, 540, 150 * scale, 50 * scale, 30 * scale);
            const car2 = newCar(400, 540, 150 * scale, 50 * scale, 30 * scale)

            ball = Bodies.circle(700, 450, 10, {
                restitution: 0.9,
                mass: props.ballMass,
                render: {
                    fillStyle: 'yellow',
                },
            });

            World.add(engine.world, [floor, ball, mouseConstraint, car, car2]);
        }

        Body.applyForce(ball, ball.position, {
            x: getVelocity(props.x, props.k, ball.mass),
            y: 0
        })

        Body.setVelocity(Composite.allBodies(car)[0], {
            x: -getVelocity(props.x, props.k, ball.mass) * ball.mass / Composite.allBodies(car)[1].mass,
            y: 0
        })

        const runner = Runner.create();
        Runner.run(runner, engine)
        Render.run(render);
    }, [props.ballMass, props.x, props.k, props.carMass, props.cases]);

    return (
        <div ref={boxRef}>
            <canvas ref={canvasRef}/>
        </div>
    );
};

export default Scene