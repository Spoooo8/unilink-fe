import Nav from '../components/Nav';
import SideBar from '../components/SideBar';
import QuizCard from '../components/QuizCard';
import Card from '../components/Card';

function DashBoard() {
  return (
    <>
          <QuizCard />
          <div className="mt-4">
            <Card />
          </div>
     
    </>
  );
}

export default DashBoard;
