import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDateArabic } from '../utils/dateFormatter';
import './TrackingDetails.css';

const TrackingDetails: React.FC = () => {
  const { currentStatus, trackingNumber, provider, timestamp, promisedDate, statusHistory, loading, error } = useSelector((state: RootState) => state.tracking);

  if (loading) {
    return <div className="loading">جاري التحميل<span className="loading-dots">...</span></div>;
  }

  if (error) {
    return <div className="error">حدث خطأ: {error}</div>;
  }

  if (!trackingNumber) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'green';
      case 'IN_TRANSIT':
        return 'yellow';
      case 'OUT_FOR_DELIVERY':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getArabicStatus = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'تم التسليم';
      case 'IN_TRANSIT':
        return 'جاري النقل';
      case 'OUT_FOR_DELIVERY':
        return 'خرج للتسليم';
      default:
        return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="status-icon" />;
      case 'IN_TRANSIT':
        return <Truck className="status-icon" />;
      case 'OUT_FOR_DELIVERY':
        return <Package className="status-icon" />;
      default:
        return <AlertCircle className="status-icon" />;
    }
  };

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  return (
    <div className="tracking-details">
      <div className="tracking-summary">
        <div className="summary-item">
          <h3>رقم الشحنة</h3>
          <p>{trackingNumber}</p>
        </div>
        <div className="summary-item">
          <h3>آخر تحديث</h3>
          <p>{timestamp ? formatDateArabic(timestamp) : 'غير متوفر'}</p>
        </div>
        <div className="summary-item">
          <h3>اسم التاجر</h3>
          <p>{provider || 'غير محدد'}</p>
        </div>
        <div className="summary-item">
          <h3>موعد التسليم خلال</h3>
          <p>{promisedDate ? formatDateArabic(promisedDate) : formatDateArabic(estimatedDeliveryDate.toISOString())}</p>
        </div>
      </div>

      <div className="tracking-timeline">
        <div className="timeline-step active">
          <div className="step-icon"><AlertCircle /></div>
          <p>تم إنشاء الشحنة</p>
        </div>
        <div className={`timeline-step ${currentStatus === 'IN_TRANSIT' ? 'active' : ''}`}>
          <div className="step-icon"><Package /></div>
          <p>تم استلام الشحنة من التاجر</p>
        </div>
        <div className={`timeline-step ${currentStatus === 'OUT_FOR_DELIVERY' ? 'active' : ''}`}>
          <div className="step-icon"><Truck /></div>
          <p>الشحنة خرجت للتسليم</p>
        </div>
        <div className={`timeline-step ${currentStatus === 'DELIVERED' ? 'active' : ''}`}>
          <div className="step-icon"><CheckCircle /></div>
          <p>تم التسليم</p>
        </div>    
      </div>

      <div className="tracking-history">
        <h3>تفاصيل الشحنة</h3>
        {statusHistory && statusHistory.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>الفرع</th>
                <th>التاريخ والوقت</th>
                <th>التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {statusHistory.map((event, index) => (
                <tr key={index}>
                  <td>{event.hub || 'غير محدد'}</td>
                  <td>{formatDateArabic(event.timestamp)}</td>
                  <td>{getArabicStatus(event.state)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">لا توجد بيانات متاحة للشحنة</p>
        )}
      </div>

      <div className="additional-info">
        <h3>معلومات إضافية</h3>
        <p>إذا كانت لديك أي استفسارات حول شحنتك، يرجى الاتصال بخدمة العملاء على الرقم: 19991</p>
        <p>ساعات العمل: من الأحد إلى الخميس، 9 صباحًا - 5 مساءً</p>
      </div>
    </div>
  );
};

export default TrackingDetails;


