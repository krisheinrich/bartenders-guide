import MainLayout from './main';

export default ({ children }) => (
  <MainLayout>
    <div className="content-wrapper">
      { children }
    </div>
    <style jsx>{`
      .content-wrapper {
        padding-top: 80px;
      }
    `}</style>
  </MainLayout>
);
