import FirstComponent from './FirstComponent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'
import FourthComponent from './FourthComponent'
import {FifthComponent} from './FirstComponent'
import LearnJavaScript from './LearnJavaScript'

export default function LearningComponent() {
    return (
      <div className="LearningComponent">
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
        <FifthComponent />
        <LearnJavaScript />
      </div>
    );
  }