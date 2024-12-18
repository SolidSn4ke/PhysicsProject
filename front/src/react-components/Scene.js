// MatterStepOne.js
import React, {useEffect, useRef} from 'react';
import Matter from 'matter-js';

/** Функция для нахождения потенциальной энергии пружины
 * x - деформация пружины (см)
 * k - коэффициент жесткости пружины (0.2 <= k <= 1)
 * */
function elasticPotentialEnergy(x, k) {
    return 0.5 * k * x ** 2
}

/** Функция для нахождения скорости тележки
 * x - деформация пружины (см)
 * k - коэффициент жесткости пружины (0.2 <= k <= 1)
 * m - масса шарика
 * */
function getVelocity(x, k, m) {
    return Math.sqrt(2 * elasticPotentialEnergy(x, k) / m) * 0.4
}

const Scene = (props) => {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);


    function newCar(xx, yy, width, height, wheelSize, group, mass, withBarrier) {
        const Body = Matter.Body,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Constraint = Matter.Constraint;

        const wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = height * 0.5;

        const car = Composite.create({label: 'Car'}),
            body = Bodies.rectangle(xx, yy, width, height, {
                mass: mass,
                isSleeping: props.isSleeping,
                collisionFilter: {
                    group: group
                },
                density: 0.02
            })

        const wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
            collisionFilter: {
                group: group
            },
            isSleeping: props.isSleeping,
            mass: mass,
            friction: props.friction
        });

        const wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
            collisionFilter: {
                group: group
            },
            isSleeping: props.isSleeping,
            mass: mass,
            friction: props.friction
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

        if (withBarrier === true) {
            let barrier = Bodies.rectangle(xx, yy, 10, 200, {
                id: 1000,
                inertia: Infinity,
                mass: mass,
                isSleeping: props.isSleeping,
                collisionFilter: {
                    group: group
                }
            })

            const attachBarrier = Constraint.create({
                bodyB: body,
                pointB: {x: 0, y: -10},
                bodyA: barrier,
                pointA: {x: 0, y: 50},
                stiffness: 1,
                length: 0
            })

            Composite.addBody(car, barrier)
            Composite.addConstraint(car, attachBarrier)
        }

        return car;
    }

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Runner = Matter.Runner
        let Composite = Matter.Composite
        let Events = Matter.Events
        let Constraint = Matter.Constraint
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
        if (props.cases === 1) {
            const group = Body.nextGroup(true)
            let scale = 1
            car = newCar(700, 540, 150 * scale, 50 * scale, 30 * scale, group, props.carMass);

            ball = Bodies.circle(700, 450, 10, {
                restitution: 0.9,
                mass: props.ballMass,
                isSleeping: props.isSleeping,
                render: {
                    fillStyle: 'yellow',
                },
            });

            World.add(engine.world, [floor, ball, mouseConstraint, car]);
        }

        /** Сцена для второго случая*/
        if (props.cases === 2) {
            const group1 = Body.nextGroup(true)
            const group2 = Body.nextGroup(true)
            let scale = 1
            car = newCar(700, 540, 150 * scale, 50 * scale, 30 * scale, group1, props.carMass);
            const car2 = newCar(400, 540, 150 * scale, 50 * scale, 30 * scale, group2, props.car2Mass)

            ball = Bodies.circle(700, 450, 10, {
                restitution: 0.9,
                isSleeping: props.isSleeping,
                mass: props.ballMass,
                render: {
                    fillStyle: 'yellow',
                },
            });

            World.add(engine.world, [floor, ball, mouseConstraint, car, car2]);
        }

        /** Сцена для третьего случая*/
        if (props.cases === 3) {
            const group1 = Body.nextGroup(true)
            const group2 = Body.nextGroup(true)
            let scale = 1
            car = newCar(100, 540, 150 * scale, 50 * scale, 30 * scale, group1, props.carMass);
            const car2 = newCar(400, 519, 150 * scale, 50 * scale, 30 * scale, group2, props.car2Mass, true)

            ball = Bodies.circle(100, 450, 10, {
                restitution: 0.9,
                isSleeping: props.isSleeping,
                mass: props.ballMass,
                render: {
                    fillStyle: 'yellow',
                },
            });

            Events.on(engine, 'afterUpdate', () => {
                if (ball.angularVelocity > 5) {
                    console.log(ball.angularVelocity)
                    ball.setAngularVelocity(5)
                }
                if (ball.position.x > 390 || Matter.Collision.collides(ball, Composite.get(car2, 1000, "body")) !== null) {
                    console.log(ball.angularVelocity)
                    //ball.collisionFilter.group = group2;
                    let newBall = Bodies.circle(Composite.get(car2, 1000, "body").position.x, Composite.get(car2, 1000, "body").position.y, 10, {
                        restitution: 0.9,
                        collisionFilter: {
                            group: group2
                        },
                        mass: props.ballMass,
                        render: {
                            fillStyle: 'yellow',
                        },
                    });
                    const attachBall = Constraint.create({
                        bodyB: Composite.get(car2, 1000, "body"),
                        bodyA: newBall,
                        stiffness: 1,
                        length: 0
                    })
                    Composite.addBody(car2, newBall)
                    Composite.addConstraint(car2, attachBall)

                    Body.applyForce(Composite.allBodies(car2)[0], Composite.allBodies(car2)[0].position, {
                        x: Math.sqrt(props.ballMass / (props.ballMass + props.car2Mass)) * getVelocity(props.x, props.k, props.ballMass) / 4,
                        y: 0
                    })
                    console.log(Math.sqrt(props.ballMass / (props.ballMass + props.car2Mass)) * getVelocity(props.x, props.k, props.ballMass) / 10)

                    Events.off(engine)
                    World.remove(engine.world, ball)
                }
            })

            World.add(engine.world, [floor, ball, mouseConstraint, car, car2]);
        }

        Body.applyForce(ball, ball.position, {
            x: getVelocity(props.x, props.k, ball.mass),
            y: 0
        })

        Body.setVelocity(Composite.allBodies(car)[0], {
            x: -getVelocity(props.x, props.k, ball.mass) * ball.mass / Composite.allBodies(car)[1].mass * (1.1 - props.friction),
            y: 0
        })

        const runner = Runner.create();
        Runner.run(runner, engine)
        Render.run(render);

        return () => {
            Matter.Engine.clear(engine)
        }
    }, [props.ballMass, props.x, props.k, props.carMass, props.cases, props.car2Mass, props.friction, props.isSleeping]);

    return (
        <div ref={boxRef}>
            <canvas ref={canvasRef}/>
        </div>
    );
};

export default Scene