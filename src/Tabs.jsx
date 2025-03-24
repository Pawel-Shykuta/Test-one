import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import "./Tabs.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { CiBank, CiShop, CiMail, CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { IoPersonAddOutline, IoBookOutline, IoListOutline } from "react-icons/io5";
import { FiBox, FiPieChart } from "react-icons/fi";
import { MdOutlineAddShoppingCart, MdOutlineArticle } from "react-icons/md";

const iconComponents = {
  BsFillTelephoneOutboundFill,
  CiBank,
  RxDashboard,
  IoPersonAddOutline,
  CiShop,
  CiMail,
  CiSettings,
  IoBookOutline,
  FiBox,
  IoListOutline,
  MdOutlineAddShoppingCart,
  MdOutlineArticle,
  FiPieChart
};

const initialTabs = [
  { id: "1", title: "Dashboard", iconName: "BsFillTelephoneOutboundFill", url: "/" },
  { id: "2", title: "Banking", iconName: "CiBank", url: "/Banking" },
  { id: "3", title: "Telefonie", iconName: "RxDashboard", url: "/Telefonie" },
  { id: "4", title: "Accounting", iconName: "IoPersonAddOutline", url: "/Accounting" },
  { id: "5", title: "Verkauf", iconName: "CiShop", url: "/Verkauf" },
  { id: "6", title: "Statistik", iconName: "FiPieChart", url: "/Statistik" },
  { id: "7", title: "Post Office", iconName: "CiMail", url: "/PostOffice" },
  { id: "8", title: "Administration", iconName: "CiSettings", url: "/Administration" },
  { id: "10", title: "Help", iconName: "IoBookOutline", url: "/Help" },
  { id: "11", title: "Warenbestand", iconName: "FiBox", url: "/Warenbestand" },
  { id: "12", title: "Auswahllisten", iconName: "IoListOutline", url: "/Auswahllisten" },
  { id: "13", title: "Einkauf", iconName: "MdOutlineAddShoppingCart", url: "/Einkauf" },
  { id: "14", title: "Rechn", iconName: "MdOutlineArticle", url: "/Rechn" }
];

function Tabs() {
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem("tabs");
    return savedTabs ? JSON.parse(savedTabs) : initialTabs;
  });

  const [visibleTabs, setVisibleTabs] = useState([]);
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [activeTab,setActiveTab] = useState(null);
 
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const updateTabVisibility = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      let totalWidth = 0;
      let visible = [];
      let hidden = [];

      for (const tab of tabs) {
        const tabWidth = 140;
        if (totalWidth + tabWidth < containerWidth - 50) {
          visible.push(tab);
          totalWidth += tabWidth;
        } else {
          hidden.push(tab);
        }
      }
      setVisibleTabs(visible);
      setHiddenTabs(hidden);
    };

    updateTabVisibility();
    window.addEventListener("resize", updateTabVisibility);
    return () => window.removeEventListener("resize", updateTabVisibility);
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));  
  }, [tabs]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let updatedVisibleTabs = [...visibleTabs];
    let updatedHiddenTabs = [...hiddenTabs];

    if (source.droppableId === destination.droppableId) {
    
      const [movedTab] = (source.droppableId === "visibleTabs" ? updatedVisibleTabs : updatedHiddenTabs).splice(source.index, 1);
      (destination.droppableId === "visibleTabs" ? updatedVisibleTabs : updatedHiddenTabs).splice(destination.index, 0, movedTab);
    } else {
      
      const [movedTab] = (source.droppableId === "visibleTabs" ? updatedVisibleTabs : updatedHiddenTabs).splice(source.index, 1);
      (destination.droppableId === "visibleTabs" ? updatedVisibleTabs : updatedHiddenTabs).splice(destination.index, 0, movedTab);
    }

    setVisibleTabs(updatedVisibleTabs);
    setHiddenTabs(updatedHiddenTabs);

   
    const updatedTabs = [...updatedVisibleTabs, ...updatedHiddenTabs];
    setTabs(updatedTabs);
  };

  return (
    <div className="tabs-container" ref={containerRef}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="visibleTabs" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="tabs">
              {visibleTabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => {navigate(tab.url); handleTabClick(tab.id)}}
                      className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    >
                      {React.createElement(iconComponents[tab.iconName])} {tab.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {hiddenTabs.length > 0 && (
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <IoMdArrowDropdown />
            </button>
            {dropdownOpen && (
              <Droppable droppableId="hiddenTabs">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="dropdown-menu">
                    {hiddenTabs.map((tab, index) => (
                      <Draggable key={tab.id} draggableId={tab.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => navigate(tab.url)}
                            className="dropdown-item"
                          >
                            {React.createElement(iconComponents[tab.iconName])} {tab.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        )}
      </DragDropContext>
    </div>
  );
}

export default Tabs;
