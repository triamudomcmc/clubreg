import Navigation from "@components/common/Navigation";
import Footer from "@components/common/Footer";

const PageContainer = ({children, footer = true}) => {
  return (
    <div className="font-display">
      <Navigation/>
      {children}
      {footer && <Footer/>}
    </div>
  )
}

export default PageContainer