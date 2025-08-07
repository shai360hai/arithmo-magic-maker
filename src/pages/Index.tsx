import InvoiceGenerator from "@/components/InvoiceGenerator";
import PastryContactCard from "@/components/PastryContactCard";

const Index = () => {
  return (
    <div className="main-layout">
      <PastryContactCard />
      <InvoiceGenerator />
    </div>
  );
};

export default Index;
