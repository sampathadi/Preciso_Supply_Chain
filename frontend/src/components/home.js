import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import '../styles/Pages.css';

function Home() {
  const [stats, setStats] = useState([
    { icon: '📦', label: 'Total Assets', value: '2,456' },
    { icon: '🚚', label: 'In Transit', value: '342' },
    { icon: '✅', label: 'Delivered', value: '8,923' },
    { icon: '⚠️', label: 'Pending', value: '127' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await dashboardAPI.getDashboardStats();
        
        if (response.data.stats) {
          setStats([
            { icon: '📦', label: 'Total Assets', value: response.data.stats.totalAssets || '2,456' },
            { icon: '🚚', label: 'In Transit', value: response.data.stats.inTransit || '342' },
            { icon: '✅', label: 'Delivered', value: response.data.stats.delivered || '8,923' },
            { icon: '⚠️', label: 'Pending', value: response.data.stats.pending || '127' }
          ]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setLoading(false);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await dashboardAPI.getRecentActivity(3);
        if (response.data.activities) {
          setActivities(response.data.activities);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setActivities([
          { status: 'PENDING', title: 'Order #2024-001 Created', time: '2 hours ago' },
          { status: 'IN TRANSIT', title: 'Shipment #SH-5432 Departed', time: '4 hours ago' },
          { status: 'DELIVERED', title: 'Order #2023-999 Delivered', time: '1 day ago' }
        ]);
      }
    };

    fetchDashboardData();
    fetchActivities();
  }, []);

  return (
    <div className="container">
      {/* Hero banner */}
      <div className="hero-banner card" style={{backgroundImage: `url('https://images.unsplash.com/photo-1581092334443-44b4a1a6f0b3?auto=format&fit=crop&w=1400&q=60')`, backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="hero-overlay">
          <h2>Preciseo supply-chain Private Ltd</h2>
          <p>Delivering goods efficiently across the globe with complete visibility.</p>
        </div>
      </div>

      {/* Two-column content */}
      <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:24,alignItems:'start',marginTop:18}}>
        <div>
          <h1 style={{fontSize:34,lineHeight:1.05}}>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing</h1>
          <p style={{color:'#475569'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.</p>
        </div>

        <div>
          <div className="card">
            <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <p>Dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris penatibus faucibus tincidunt quis ut pellentesque magna.</p>
          </div>
        </div>
      </div>

      {/* Stats row below */}
      <div style={{marginTop:18,display:'flex',gap:12}}>
        {stats.map((s,idx)=> (
          <div key={idx} className="card" style={{flex:1,textAlign:'center'}}>
            <h3 style={{margin:0}}>{s.value}</h3>
            <p style={{margin:0,color:'#64748b'}}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Warehouse preview removed — use Warehouse Dashboard page for full features */}
    </div>
  );
}

export default Home;
 