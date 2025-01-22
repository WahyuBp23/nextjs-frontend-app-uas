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
              <Button type="link" className={["nav-link"]} href="/">
                <div className="sb-nav-link-icon">
                  <i className="fa-book"></i>
                </div>
                Student
              </Button>
              <Button type="link" className={["nav-link"]} href="/grade">
                <div className="sb-nav-link-icon">
                  <i className="fa-book"></i>
                </div>
                Grade
              </Button>
              <div className="sb-sidenav-menu-heading">Transaksi</div>
              <Button type="link" className={["nav-link"]} href="/saving">
                <div className="sb-nav-link-icon">
                  <i className="fa-lightning"></i>
                </div>
                Saving
              </Button>
              <div className="sb-sidenav-menu-heading">Setting</div>
              <Button type="link" className={["nav-link"]} href="/user">
                <div className="sb-nav-link-icon">
                  <i className="fa-users"></i>
                </div>
                Users
              </Button>
              <Button type="link" className={["nav-link"]} href="">
                <div className="sb-nav-link-icon">
                  <i className="fa-users"></i>
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
