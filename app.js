document.addEventListener('DOMContentLoaded', function () {
    function createModal() {
        if (document.getElementById('skillbridgeActionModal')) {
            return;
        }

        const modalHtml = `
            <div class="modal fade" id="skillbridgeActionModal" tabindex="-1" aria-labelledby="skillbridgeActionModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="skillbridgeActionModalLabel">Thông báo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    function showModal(title, message) {
        createModal();
        const modalEl = document.getElementById('skillbridgeActionModal');
        const modalTitle = modalEl.querySelector('.modal-title');
        const modalBody = modalEl.querySelector('.modal-body');
        modalTitle.textContent = title;
        modalBody.textContent = message;
        if (window.bootstrap && typeof window.bootstrap.Modal === 'function') {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        } else {
            alert(message);
        }
    }

    function getActionMessage(element) {
        const action = (element.dataset.action || '').trim().toLowerCase();
        const text = (element.textContent || '').trim().toLowerCase();
        const label = action || text;

        if (label.includes('ứng tuyển') || label.includes('apply')) {
            return { title: 'Ứng tuyển', message: 'Ứng tuyển thành công.' };
        }
        if (label.includes('xem chi tiết') || label.includes('view details') || label.includes('view project') || label.includes('chi tiết dự án') || label.includes('view contract')) {
            return { title: 'Xem chi tiết', message: 'Đang hiển thị chi tiết dự án hoặc hợp đồng.' };
        }
        if (label.includes('mua boost') || label.includes('boost job') || label.includes('boost')) {
            return { title: 'Boost Job', message: 'Boost Job thành công.' };
        }
        if (label.includes('mua ngay') || label.includes('premium') || label.includes('đăng ký premium') || label.includes('upgrade') || label.includes('nâng cấp')) {
            return { title: 'Premium', message: 'Đăng ký Premium thành công.' };
        }
        if (label.includes('giải ngân') || label.includes('release payment') || label.includes('thanh toán')) {
            return { title: 'Thanh toán', message: 'Thanh toán thành công.' };
        }
        if (label.includes('gửi') || label.includes('send')) {
            return { title: 'Tin nhắn', message: 'Tin nhắn đã được gửi.' };
        }
        if (label.includes('chat')) {
            return { title: 'Chat', message: 'Hộp thoại Chat đã được mở.' };
        }
        if (label.includes('edit portfolio') || label.includes('chỉnh sửa portfolio')) {
            return { title: 'Portfolio', message: 'Chỉnh sửa Portfolio thành công.' };
        }
        if (label.includes('download') || label.includes('tải')) {
            return { title: 'Tải xuống', message: 'Tải xuống đã hoàn tất.' };
        }
        if (label.includes('qr portfolio') || label.includes('generate qr') || label.includes('qr')) {
            return { title: 'QR Portfolio', message: 'QR Portfolio đã tạo thành công.' };
        }
        if (label.includes('share badge')) {
            return { title: 'Chia sẻ Badge', message: 'Badge đã được chia sẻ thành công.' };
        }
        if (label.includes('approve') || label.includes('phê duyệt')) {
            return { title: 'Phê duyệt', message: 'Đã phê duyệt thành công.' };
        }
        if (label.includes('reject') || label.includes('từ chối')) {
            return { title: 'Từ chối', message: 'Đã từ chối thành công.' };
        }
        if (label.includes('export') || label.includes('xuất')) {
            return { title: 'Xuất báo cáo', message: 'Báo cáo đã được xuất thành công.' };
        }
        if (label.includes('explore projects') || label.includes('khám phá') || label.includes('explore')) {
            return { title: 'Khám phá dự án', message: 'Danh sách dự án đã được mở.' };
        }
        if (label.includes('đăng nhập') || label.includes('login')) {
            return { title: 'Đăng nhập', message: 'Đăng nhập thành công.' };
        }
        if (label.includes('đăng xuất') || label.includes('logout')) {
            return { title: 'Đăng xuất', message: 'Đã đăng xuất thành công.' };
        }
        if (label.includes('back') || label.includes('trở về') || label.includes('home')) {
            return { title: 'Quay lại', message: 'Đã quay về trang trước.' };
        }
        return null;
    }

    document.body.addEventListener('click', function (event) {
        const target = event.target.closest('a[href="#"], button, [data-action]');
        if (!target) {
            return;
        }

        const tagName = target.tagName.toLowerCase();
        if (tagName === 'button' && target.type === 'submit') {
            return;
        }

        const href = target.getAttribute('href');
        if (tagName === 'a' && href !== '#') {
            return;
        }

        const actionMessage = getActionMessage(target);
        if (actionMessage) {
            event.preventDefault();
            showModal(actionMessage.title, actionMessage.message);
            return;
        }

        if (tagName === 'a' && href === '#') {
            event.preventDefault();
            showModal('Thông báo', 'Đây là tính năng demo. Không có backend.');
        }
    });
});
