import { setSearchTerm } from "../features/searchSlice";
import { useDispatch } from "react-redux";

export default function Sidebar() {
    const dispatch = useDispatch();

    function handleClick(term) {
        window.scrollTo(0, 0);
        dispatch(setSearchTerm(term));
    }

    return (
        <>
        <div className='side-bar-div'>
            <ul className="side-bar-list">
                <h2 className="side-title">Quick Search</h2>
                <li className="side-bar-item" onClick={() => handleClick('AITA')}>
                    AITA
                </li>
                <li className="side-bar-item" onClick={() => handleClick('relationship_advice')}>
                    relationship_advice
                </li>
                <li className="side-bar-item" onClick={() => handleClick('AskReddit')}>
                    AskReddit
                </li>
                <li className="side-bar-item" onClick={() => handleClick('PetPeeves')}>
                    PetPeeves
                </li>
                <li className="side-bar-item" onClick={() => handleClick('LifeProTips')}>
                    LifeProTips
                </li>
                <li className="side-bar-item" onClick={() => handleClick('TodayILearned')}>
                    TodayILearned
                </li>
                <li className="side-bar-item" onClick={() => handleClick('Jokes')}>
                    Jokes
                </li>
                <li className="side-bar-item" onClick={() => handleClick('Showerthoughts')}>
                    Showerthoughts
                </li>
            </ul>
        </div>
        </>
    );
}