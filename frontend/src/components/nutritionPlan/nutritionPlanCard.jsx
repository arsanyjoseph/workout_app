import './nutritionPlanCard.css'

export default function NPCard ({day, item}) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (
        <div className='npCardCont'>
            <h2>{days[day]}</h2> 
            <h5>Carbs: {item.carb} gm</h5>
            <h5>Fats: {item.fat} gm</h5>
            <h5>Proteins: {item.protein} gm</h5>
            <h5>Total Calories: 50gm</h5>
        </div>
    )
}