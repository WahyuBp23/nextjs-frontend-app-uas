import Button from "@/components/atoms/Button";
import React from "react";

export default function Sidebar() {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Master Data</div>
              <Button type="link" className={["nav-link"]} href="student/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book"></i>
                </div>
                Student
              </Button>
              <div className="sb-sidenav-menu-heading">Transaksi</div>
              <Button type="link" className={["nav-link"]} href="saving/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-lightning"></i>
                </div>
                Saving
              </Button>
              <div className="sb-sidenav-menu-heading">Setting</div>
              <Button type="link" className={["nav-link"]} href="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                Users
              </Button>
              <Button type="link" className={["nav-link"]} href="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                Lougout
              </Button>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
          </div>
        </nav>
      </div>
    </>
  );
}
